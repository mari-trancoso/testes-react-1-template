import { getByTestId, getByText, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("TodoList", () => {
    test("deve renderizar um título", () => {
        render(<TodoList/>)
        // screen.debug() console.log do jest

        // const title = screen.getByText("Todo List")
        const title = screen.getByText(/todo list/i) //forma com regex

        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com input vazio", () => {
        render(<TodoList/>)
        screen.debug()

        const input = screen.getByPlaceholderText(/enter a todo/i) //forma com regex

        expect(input).toHaveValue("")
    })

    test("deve atualizar o valor do input ao ser digitado", async() => {
        const user = userEvent.setup()
        
        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i) //forma com regex

        await user.type(input, "Revisar React")

        expect(input).toHaveValue("Revisar React")
    })

    test("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla enter", async() => {
        const user = userEvent.setup()
        
        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")
        //coloca entre {} a tecla que você vai clicar

        const item = screen.getByText("Revisar React")

        expect(input).toHaveValue("")
        expect(item).toBeInTheDocument()
    })

    test("deve alterar o status da tarefa quando o botão de alterar status for clicado", async() => {
        const user = userEvent.setup()
        
        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        const toggleBtn = screen.getByRole('button', {
            name: /toggle/i
        })

        const item = screen.getByText("Revisar React")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: line-through")

        await user.click(toggleBtn)
        expect(item).toHaveStyle("text-decoration: none")
    })

    test("deve remover a tarefa quando o botão de deletar for clicado", async() => {
        const user = userEvent.setup()
        
        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "Revisar React{enter}")

        // screen.logTestingPlaygroundURL()

        const toggleBtn = screen.getByRole('button', { name: /delete/i })

        const item = screen.queryByText("Revisar React")

        await user.click(toggleBtn)
        expect(item).not.toBeInTheDocument()

        
    })
})

