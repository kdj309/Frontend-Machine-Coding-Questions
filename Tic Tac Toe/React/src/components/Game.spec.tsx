import { render, screen } from "@testing-library/react";
import Game from "./Game";
import App from "../App";
test("First Test", () => {
  render(<Game gridSize={3}/>);
  const result = screen.getByText(/Result/);
  expect(result).toBeInTheDocument();
});
test("Different Grid Size",()=>{
  const gridSize=4
  render(<Game gridSize={4}/>);
  const rows=screen.getAllByRole("row");
  const cols=screen.getAllByRole("col");
  expect(rows).toHaveLength(gridSize);
  expect(cols).toHaveLength(gridSize*gridSize);
})
test("Test Input",()=>{
  render(<App/>);
  const helptext=screen.getByText("Please Provide as same as govt id");
  expect(helptext).toBeInTheDocument()
})