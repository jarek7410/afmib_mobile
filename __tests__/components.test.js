import 'react-native'
import React, { useState } from "react";
import Button from "../src/components/Button";
import renderer from "react-test-renderer";
import SignInUpTextInput from "../src/components/SignInUpTextInput";

describe('Button component', () => {
  test('render', () => {
    const tree = renderer.create(<Button title={'test'} />).toJSON()
    expect(tree).toMatchSnapshot();
  });
});
describe('sign up text input component', () => {
  test('render', () => {;
    const tree = renderer.create(<SignInUpTextInput   onChangeText={()=>{}} placeholder={"text"} value={"text"}/>).toJSON()
    expect(tree).toMatchSnapshot();
  });
});
