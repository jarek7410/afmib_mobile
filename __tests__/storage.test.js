import React from 'react';
import renderer from 'react-test-renderer';
import { getServerURL, getToken, setLoginData } from "../src/storage/login";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { getCodeJoin, saveCodeJoin } from "../src/storage/tournament";
import { codejoinDTO } from "../src/storage/dto";

describe('storage', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    AsyncStorage.setItem.mockClear();
  });
  it('get check for code join', async () => {
    await getCodeJoin();
    expect(AsyncStorage.getItem).toBeCalledWith('@codeJoin');
  });
  it('set check for code join', async () => {
    const codeJoin = { codeJoin: 'test'} ;
    await saveCodeJoin(codeJoin);
    expect(await AsyncStorage.getItem("@codeJoin")).toBe(JSON.stringify(codeJoin))
    // expect(AsyncStorage.setItem).toBeCalledWith('@codeJoin');
  });
  it("get check for token", async () => {
    await getToken()
    expect(AsyncStorage.getItem).toBeCalledWith('@token');
  });
  it('get check for code join', async () => {
    await getServerURL();
    expect(AsyncStorage.getItem).toBeCalledWith('@serverURL');
  });
  it('set check for login data', async () => {
    await setLoginData({ email:'test',name:'test', token: 'test'});
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@loginData').toHaveBeenCalledWith('@token');
  });
});
// it('renders correctly', () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// };
