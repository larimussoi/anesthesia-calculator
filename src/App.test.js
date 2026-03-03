test("renders application title", () => {
  render(<App />);
  const titleElement = screen.getByText(/calculadora de dosagem anestésica/i);
  expect(titleElement).toBeInTheDocument();
});
