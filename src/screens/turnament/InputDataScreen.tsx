import React, { useState } from "react";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../rootStats.ts';
import { screen } from '../../enum/screen.ts';
import { style } from "../../styles/loginRegisterStyle.ts";
import { useTranslation } from "react-i18next";
import RadionButton from "../../components/radiobutton";

type Props = NativeStackScreenProps<RootStackParamList, screen.InputData>;

export const InputDataScreen = ({ navigation }: Props) => {
  const {t}=useTranslation()
  const [name1,setName1]=useState<string>("")
  const [surname1,setSurname1]=useState<string>("")
  const [PID1,setPID1]=useState<string>("")
  const [isN,setIsN]=useState<boolean>(true)
  const [isW,setIsW]=useState<boolean>(true)


  const [name2,setName2]=useState<string>("")
  const [surname2,setSurname2]=useState<string>("")
  const [PID2,setPID2]=useState<string>("")

  return (
    <SafeAreaView style={{padding:5}}>
      <Text style={style.text}>{t("firstPlayer")}</Text>
      <View style={style.horizontalContainer}>
        <View>
          <TextInput
            style={style.TextInput}
            value={PID1}
            onChangeText={setPID1}
            placeholder={t("pidorzero")}
            // autoFocus={true}
            // returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize={"none"}
          />
        <TextInput
          style={style.TextInput}
          value={name1}
          onChangeText={setName1}
          placeholder={t("name")}
          // autoFocus={true}
          // returnKeyType="next"
          blurOnSubmit={false}
          autoCapitalize={"words"}
        />
        <TextInput
          style={style.TextInput}
          value={surname1}
          onChangeText={setSurname1}
          placeholder={t("surname")}
          // autoFocus={true}
          // returnKeyType="next"
          blurOnSubmit={false}
          autoCapitalize={"words"}
        />
      </View>
        <View>

          <RadionButton onSelect={() => {setIsN(true)}} state={isN}>
            <>
              {isN&&
                <Text>N</Text>
              }
              {!isN&&
                <Text>S</Text>
              }
            </>
          </RadionButton>

          <RadionButton onSelect={() => {setIsW(true)}} state={isW}>
            <>
              {isW&&
                <Text>W</Text>
              }
              {!isW&&
                <Text>E</Text>
              }
            </>
          </RadionButton>
        </View>
      </View>
      <Text style={style.text}>{t("secendPlayer")}</Text>
      <View style={style.horizontalContainer}>
      <View>

        <TextInput
          style={style.TextInput}
          value={PID2}
          onChangeText={setPID2}
          placeholder={t("pidorzero")}
          // autoFocus={true}
          // returnKeyType="next"
          blurOnSubmit={false}
          autoCapitalize={"none"}
        />
        <TextInput
          style={style.TextInput}
          value={name2}
          onChangeText={setName2}
          placeholder={t("name")}
          // autoFocus={true}
          // returnKeyType="next"
          blurOnSubmit={false}
          autoCapitalize={"words"}
        />
        <TextInput
          style={style.TextInput}
          value={surname2}
          onChangeText={setSurname2}
          placeholder={t("surname")}
          // autoFocus={true}
          // returnKeyType="next"
          blurOnSubmit={false}
          autoCapitalize={"words"}
        />
      </View>
        <View>
        <RadionButton onSelect={() => {setIsN(false)}} state={!isN}>
          <>
            {!isN&&
              <Text>N</Text>
            }
            {isN&&
              <Text>S</Text>
            }
          </>
        </RadionButton>

        <RadionButton onSelect={() => {setIsW(false)}} state={!isW}>
          <>
            {!isW&&
              <Text>W</Text>
            }
            {isW&&
              <Text>E</Text>
            }
          </>
        </RadionButton>
        </View>
      </View>
    </SafeAreaView>
  );
};
