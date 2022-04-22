// Tests
import renderer from 'react-test-renderer';

// Components
import Modal from '.';

test("Modal Component Snapshot", () => {
  const component = renderer.create(
    <Modal type="message" title="Claimable Matic Amount" />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});