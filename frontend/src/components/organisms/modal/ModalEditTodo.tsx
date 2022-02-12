/* eslint-disable react-hooks/exhaustive-deps */
import {  memo, useEffect, useState, VFC } from "react";
import Modal from 'react-modal';

import { Todo } from "types/api/todo";
import { EditTodo } from "components/molecules/input/EditTodo";

type Props = {
    todo: Todo;
    isOpen: boolean;
    onClickEdit: (todo: Todo) => void
    onClose: () => void;
};

export const ModalEditTodo: VFC<Props> = memo((props) => {
    const { todo, isOpen, onClickEdit, onClose } = props;
    
    Modal.setAppElement('#root');

    const [ todoId, setTodoId ] = useState<number>(0);
    const [ todoTitle, setTodoTitle ] = useState<string>("");
    const [ todoDone, setTodoDone ] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setTodoId(todo?.id!);
            setTodoTitle(todo?.title!);
            setTodoDone(todo?.done ?? false);
        }
        return () => { isMounted = false };
    },[todo, onClose]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const afterOpenModal = () => {
        //console.log("afterOpenModal");
    }

    return(
        <>
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Modal For Todo Edit"
        >
            <EditTodo
                todoId={todoId}
                todoDone={todoDone}
                todoTitle={todoTitle}
                onClick={onClickEdit}
                onClose={onClose}
            />
        </Modal>
        </>
    );
});