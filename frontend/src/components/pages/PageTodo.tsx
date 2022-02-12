/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState, VFC } from "react";
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "hooks/user/useAuth";
import { useLoading } from "hooks/useLoading";
import { InputText } from 'components/molecules/input/InputText';
import { useGetAllTodos } from "hooks/todo/useGetAllTodos";
import Spinner from "components/atoms/spinner/Spinner";
import { useAddTodo } from "hooks/todo/useAddTodo";
import { useDeleteTodo } from "hooks/todo/useDeleteTodo";
import { useEditTodo } from "hooks/todo/useEditTodo";
import { useSelectTodo } from "hooks/todo/useSelectTodo";
import { ModalEditTodo } from "components/organisms/modal/ModalEditTodo";
import { Paginate } from "components/molecules/Paginate";
import { TodoList } from "components/organisms/todo/TodoList";
import { DefaultLayout } from "components/templates/DefaultLayout";
import { Todo } from "types/api/todo";
import { useSignOut } from "hooks/user/useSignOut";
import { useTodos } from "hooks/todo/useTodos";
import { AuthTokenHeaderProps } from "types/authTokenHeaderProps";

export const PageTodo: VFC = memo(() => {
    const { authenticatedUser,
        isAuthenticated,
        authTokens,
        isConfirmed
    } = useAuth();
    const { todos, totalPages } = useTodos();
    const { loading } = useLoading();
    const { signOut } = useSignOut();
    const [ todoTitle, setTodoTitle ] = useState<string>("");
    const [ modalIsOpen, setModalIsOpen ] = useState<boolean>(false);
    const { getAllTodos } = useGetAllTodos();
    const { addTodo } = useAddTodo();
    const { deleteTodo } = useDeleteTodo();
    const { onSelectTodo, selectedTodo } = useSelectTodo();
    const { editTodo } = useEditTodo();
    const [ currentPageNumber, setCurrentPageNumber ] = useState<number>(1);
    const [ todoOnChange, setTodoOnChange ] = useState<Todo | undefined>(undefined);
    const initialLoaded = useRef<boolean>(false);
    const initialTodos = useRef<Todo[]>([]);
    
    useEffect(() => {
        isAuthenticated
        && authTokens?.["access-token"]!
        && authTokens?.client!
        && authTokens?.uid!
        && getAllTodos(authTokens)
    },[]);

    useEffect(() => {
        initialTodos.current=todos
            .sort((a, b) => b.id! - a.id!)
            .map(todo => { return todo });
    },[todos]);

    useEffect(() => {
        if(initialLoaded.current) {
            isAuthenticated
            && authTokens?.["access-token"]!
            && authTokens?.client!
            && authTokens?.uid!
            && editTodo({todo: todoOnChange, authTokenHeaderProps: authTokens, initialTodos: initialTodos.current})
        }
        else {
            initialLoaded.current=true
        }
    },[todoOnChange]);

    const onChangeTodoTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.target.value);
    },[todoTitle]);

    const onClickAdd = useCallback((todoTitle: Todo) => {
        addTodo({todoTitle, authTokenHeaderProps: authTokens!, initialTodos: initialTodos.current});
        setTodoTitle("");
        setCurrentPageNumber(1);
    },[authTokens]);

    const onClickDelete = useCallback((id: number) => {
        deleteTodo({id, authTokenHeaderProps: authTokens!, initialTodos: initialTodos.current});
    },[authTokens]);

    const onClickEditOpen = useCallback((id: number) => {
        onSelectTodo({ id, todos });
        setModalIsOpen(true);
    },[todos, onSelectTodo, modalIsOpen]);

    const onClickEdit = useCallback((todo: Todo) => {
        editTodo({todo, authTokenHeaderProps: authTokens!, initialTodos: initialTodos.current});
        onCloseModal();
    },[todos, editTodo]);

    const onChangeDone = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const targetTodo = todos.find((todo) => todo.id === Number(e.target.id));
        setTodoOnChange({ ...targetTodo!, done: e.target.checked })
    },[todos, setTodoOnChange]);

    const onCloseModal = useCallback(() => {
        setModalIsOpen(false);
    },[modalIsOpen]);

    const onClickPage = useCallback((pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    },[currentPageNumber]);

    const onClickSignOut = useCallback((authTokenHeaderProps: AuthTokenHeaderProps) => {
        signOut({authTokenHeaderProps});
    },[]);

    return (
        <>
            <ToastContainer />
            {loading
                ? (<Spinner />)
                : (
                    <DefaultLayout
                        onClick={onClickSignOut}
                    >
                        {isConfirmed
                            ? (
                                <StyledContainer>
                                <p><b>{authenticatedUser?.name}</b></p>
                                <InputText
                                    value={todoTitle}
                                    onChange={onChangeTodoTitle}
                                    onClick={onClickAdd} />
                                    {todos.length !== 0
                                        ? (
                                            <>
                                            <TodoList
                                                todos={todos}
                                                currentPageNumber={currentPageNumber}
                                                onChangeDone={onChangeDone}
                                                onClickDelete={onClickDelete}
                                                onClickEditOpen={onClickEditOpen} />
                                            <Paginate
                                                currentPageNumber={currentPageNumber}
                                                totalPages={totalPages}
                                                onClickPage={onClickPage} />
                                            </>
                                          )
                                        : (<p>Your todo is nothing.</p>)
                                    }
                                </StyledContainer>
                              )
                            : (
                                <StyledContainer>
                                <StyledHeader>You're signed up!</StyledHeader>
                                <h3>Now, go check your email.</h3>
                                <h3>{authenticatedUser?.email}</h3>
                                </StyledContainer>
                              )
                        }
                    </DefaultLayout>
                  )
            }
            <ModalEditTodo
                todo={selectedTodo!}
                isOpen={modalIsOpen}
                onClickEdit={onClickEdit}
                onClose={onCloseModal} />
        </>
    )
});

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
`
const StyledHeader=styled.h2`
    text-align: center;
    color: #4CAF50;
    margin-bottom: 48px;
`