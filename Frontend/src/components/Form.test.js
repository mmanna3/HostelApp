import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';
import React from 'react';
import Form from './Form';
import { Input } from './Input';
import { CardBody, ModalCard } from './Modal';
import Select from './Select';

global.MutationObserver = window.MutationObserver;
configure({ adapter: new Adapter() }); //Needed to mount nested components

const A_NAME = 'someName';

/*
  All tests will check Components with "Name" prop have a function in the register attribute.
  To test 'Simple component' an Input is used.
  To test 'Complex component' a Select is used.
*/

it('Supports simple React Component', () => {
  const jsx = (
    <Form>
      <Input name={A_NAME} />
    </Form>
  );

  const wrapper = mount(jsx);

  AssertInputExistsAndHasValidRegisterProp(wrapper);
});

describe('Supports simple React Component nested', () => {
  it('In HTML tree', () => {
    const jsx = (
      <Form>
        <div>
          <div>
            <Input name={A_NAME} />
          </div>
        </div>
      </Form>
    );

    const wrapper = mount(jsx);

    AssertInputExistsAndHasValidRegisterProp(wrapper);
  });

  it('In React Component tree', () => {
    const jsx = (
      <Form>
        <ModalCard>
          <CardBody>
            <Input name={A_NAME} />
          </CardBody>
        </ModalCard>
      </Form>
    );

    const wrapper = mount(jsx);

    AssertInputExistsAndHasValidRegisterProp(wrapper);
  });
});

describe('Supports complex React Component nested', () => {
  it('In React Component tree', () => {
    const jsx = (
      <Form>
        <ModalCard>
          <CardBody>
            <Select name={A_NAME}>
              <option>1</option>
            </Select>
          </CardBody>
        </ModalCard>
      </Form>
    );

    const wrapper = mount(jsx);

    AssertSelectExistsAndHasValidRegisterProp(wrapper);
  });

  it('In HTML tree wrapped in another component', () => {
    const SelectCama = () => {
      return (
        <div>
          <Select name={A_NAME}>
            <option value="1">Individual</option>
            <option value="2">Matrimonial</option>
            <option value="3">Cucheta</option>
          </Select>
        </div>
      );
    };

    const jsx = (
      <Form>
        <ModalCard>
          <CardBody>
            <SelectCama />
          </CardBody>
        </ModalCard>
      </Form>
    );

    const wrapper = mount(jsx);

    AssertSelectExistsAndHasValidRegisterProp(wrapper);
  });
});

it('Supports React Component that returns null', () => {
  const SelectCama = () => {
    return null;
  };

  const jsx = (
    <Form>
      <ModalCard>
        <CardBody>
          <SelectCama />
        </CardBody>
      </ModalCard>
    </Form>
  );

  mount(jsx);
});

it('Supports Array of React Component', () => {
  var array = [1, 2, 3];
  const jsx = (
    <Form>
      {array.map(index => (
        <Input key={index} name={index} />
      ))}
    </Form>
  );

  const wrapper = mount(jsx);

  var inputsAfterRemovingOne = wrapper.find(Input);
  expect(inputsAfterRemovingOne.getElements().length).toBe(3);
  inputsAfterRemovingOne.forEach(input => {
    expect(input.prop('name')).not.toBe('');
    expect(typeof input.prop('register')).toBe('function');
  });

  //Add element
  array.push(4);
  const jsx2 = (
    <Form>
      {array.map(index => (
        <Input key={index} name={index} />
      ))}
    </Form>
  );
  const wrapper2 = mount(jsx2);
  var inputsAfterAddingOne = wrapper2.find(Input);
  expect(inputsAfterAddingOne.getElements().length).toBe(4);
  inputsAfterAddingOne.forEach(input => {
    expect(input.prop('name')).not.toBe('');
    expect(typeof input.prop('register')).toBe('function');
  });

  //Remove element
  var arrayAfterRemoving = array.filter(item => item !== 2);
  const jsx3 = (
    <Form>
      {arrayAfterRemoving.map(index => (
        <Input key={index} name={index} />
      ))}
    </Form>
  );
  const wrapper3 = mount(jsx3);
  var inputsAfterRemovingOne = wrapper3.find(Input);
  expect(inputsAfterRemovingOne.getElements().length).toBe(3);
  inputsAfterRemovingOne.forEach(input => {
    expect(input.prop('name')).not.toBe('');
    expect(typeof input.prop('register')).toBe('function');
  });
});

function AssertSelectExistsAndHasValidRegisterProp(wrapper) {
  var select = wrapper.find(Select);
  expect(select.prop('name')).not.toBe('');
  expect(typeof select.prop('register')).toBe('function');
}

function AssertInputExistsAndHasValidRegisterProp(wrapper) {
  var input = wrapper.find(Input);
  expect(input.prop('name')).not.toBe('');
  expect(typeof input.prop('register')).toBe('function');
}
