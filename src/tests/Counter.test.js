import { render, screen } from "@testing-library/react"
import Counter from "../components/Counter"
import userEvent from "@testing-library/user-event"

describe("Counter", () => {

    test("deve aumentar em 3 o contador quando o botão de incremento for clicado 3 vezes", async() => {
        const user = userEvent.setup()
        render(<Counter/>)

        // screen.logTestingPlaygroundURL()

        const button = screen.getByRole('button', {
            name: /\+/i
          })

        const item = screen.getByText(/0/i)

        await user.click(button)
        await user.click(button)
        await user.click(button)
        expect(item).toBeInTheDocument("3")

    })
})