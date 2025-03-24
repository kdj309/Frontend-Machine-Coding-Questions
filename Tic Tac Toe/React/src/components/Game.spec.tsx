import { render, screen } from "@testing-library/react";
import Game from "./Game";
test("First Test", () => {
  render(<Game gridSize={3}/>);
  const result = screen.getByText(/Result/);
  expect(result).toBeInTheDocument();
});
test("Different Grid Size",()=>{
  render(<Game gridSize={4}/>);
  const rows=screen.getAllByRole("row");
  const cols=screen.getAllByRole("col");
  expect(rows.length).toBe(4);
  expect(cols.length).toBe(16);
})
