it("should render", () => {
  const snap = renderer.create(<App />).toJSON();
  expect(snap).toMatchSnapshot();
});
