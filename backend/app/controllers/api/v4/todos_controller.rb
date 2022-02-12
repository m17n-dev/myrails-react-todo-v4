class Api::V4::TodosController < ApplicationController
  before_action :authenticate_api_v4_user!
  # before_action :is_confirmed?
  before_action :set_todo, only: [:update, :destroy]

  def create
    # todo = Todo.new(todo_params)
    todo = current_api_v4_user.todos.new(todo_params)

    if todo.save
      render json: { status: 200, todo: todo }
    else
      render json: { status: 500, message: "You failed to create Todo." }
    end
  end

  def index
    # render json: { status: 200, todos: Todo.all.order(created_at: :desc, id: :asc)}
    # render json: { status: 200, todos: current_api_v4_user.todos.all.order(created_at: :desc, id: :asc) }
    render json: { status: 200, todos: current_api_v4_user.todos.all, is_confirmed: is_confirmed? }
  end

  def update
    if @todo.update(update_todo_params)
      render json: { status: 200, todo: @todo }
    else
      render json: { status: 500, message: "You failed to update Todo." }
    end
  end

  def destroy
    if @todo.destroy
      render json: { status: 200, todo: @todo }
    else
      render json: { status: 500, message: "You failed to remove Todo." }
    end
  end

  private

  def set_todo
    @todo = current_api_v4_user.todos.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :done)
  end

  def update_todo_params
    params.require(:todo).permit(:title, :done, :id, :created_at, :updated_at, :user_id)
  end
end
