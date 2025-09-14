import { render, screen } from "@testing-library/react";
import HelpBar from "./HelpBar";

describe("HelpBar", () => {
  it("renders input and button", () => {
    render(<HelpBar />);
    expect(screen.getByPlaceholderText(/ask something/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ask/i })).toBeInTheDocument();
  });
});
