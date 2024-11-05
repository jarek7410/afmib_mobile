import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import Button from "../../components/Button";
import React, { useEffect, useState } from "react";
import { movementDTO, PairStat } from "../../storage/dto.ts";
import { getMovement } from "../../api/getMovement.ts";
import { getMovementData, saveMovementData } from "../../storage/tournament.ts";
import { GetCurrentRound } from "../../api/getCurrentRound.ts";
import Text from "../../components/Text";
import RadionButton from "../../components/radiobutton";
import { style } from "../../styles/loginRegisterStyle.ts";
import { Colors } from "../../styles/Colors.ts";
import { sendNewReciveData } from "../../api/sendNewReciveData.ts";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "InputReceiveData">;
export const InputReceiveData = ({ navigation }: Props) => {
  const { t } = useTranslation();
  // const [section, setSection] = useState<number>(1);
  // const [table, setTable] = useState<number>(1);
  // const [round, setRound] = useState<number>(1);
  const [board, setBoard] = useState<number>(0);
  // const [pairNS, setPairNS] = useState<number>(1);
  // const [pairEW, setPairEW] = useState<number>(1);
  // const [declarer, setDeclarer] = useState<number>(1);
  const [nsew, setNsew] = useState<string>("");
  const [contract, setContract] = useState<string>("");
  const [contractnumber, setContractNumber] = useState<number>(0);
  const [contractSuit, setContractSuit] = useState<string>("");
  const [contractDouble, setContractDouble] = useState<string>("");
  const [result, setResult] = useState<string>("=");
  const [resultNumber, setResultNumber] = useState<number>(0);
  const [resultOutcome, setResultOutcome] = useState<string>("");
  const [leadCard, setLeadCard] = useState<string>("");
  const [leadCardSuit, setLeadCardSuit] = useState<string>("");
  const [leadCardNumber, setLeadCardNumber] = useState<string>("");
  // const [remartk, setRemark] = useState<string>("");
  // const [ereised, setEreised] = useState<boolean>(false);

  const [pairStat, setPairStat] = useState<PairStat>({} as PairStat);
  const [currentMOV, setCurrentMOV] = useState<movementDTO>({} as movementDTO);
  const [movement, setMovement] = React.useState<movementDTO[]>([]);
  useEffect(() => {
    getMovement().then(mov => {
      saveMovementData(mov);

      setMovement(mov);
    });
  }, []);
  useEffect(() => {
    getMovementData().then(mov => {
      setMovement(mov);
    });
  }, []);
  useEffect(() => {
    GetCurrentRound().then(round => {
      console.log("pairdourn", round);
      setPairStat(round);
    });
  }, []);
  useEffect(() => {
    const m = movement.find(m => {
      return m.round === pairStat.Round;
    });
    console.log("m", m);
    if (m !== undefined) {
      setCurrentMOV(m);
    }
  }, [movement, pairStat]);
  const sumeupBoard = () => {
    setContract(contractnumber + " " + contractSuit + " " + contractDouble);
    if (resultOutcome !== "=") {
      setResult(resultOutcome + resultNumber);
    } else {
      setResult(resultOutcome);
    }
    setLeadCard(leadCardSuit + leadCard);
  };
  // const setBoardText = (text: string) => {
  //   const n = parseInt(text);
  //   if (n) {
  //     setBoard(n);
  //   }
  // };
  const setResultNumberText = (text: string) => {
    const n = parseInt(text);
    if (n) {
      setResultNumber(n);
    }
  };
  // const setLeadCardNumberText = (text: string) => {
  //   const n = parseInt(text);
  //   if (n) {
  //     setLeadCardNumber(n);
  //   }
  // };
  if (!pairStat.BoardsNotPlayed) {
    return (
      <SafeAreaView style={{ backgroundColor: Colors.background }}>
        <View
          style={[
            style.rowCare,
            {
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            },
          ]}>
          <Text>AllBoardPlayed</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: Colors.background }}>
        <View
          style={[
            style.rowCare,
            {
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            },
          ]}>
          <Text>
            table:{currentMOV.table}, round:{currentMOV.round}
          </Text>
          <Text>
            {currentMOV.lowBoard}-{currentMOV.highBoard} ns:{currentMOV.nsPair}{" "}
            ew:
            {currentMOV.ewPair}
          </Text>
        </View>
        <View style={style.rowCare}>
          <Text>not played: {pairStat.BoardsNotPlayed.join(", ")}</Text>
        </View>

        <ScrollView>
          <View style={style.rowCare}>
            <Text>{t("board")}:</Text>
          </View>
          <View style={style.rowCare}>
            {pairStat.BoardsNotPlayed.map((b, i) => {
              return (
                <RadionButton
                  key={i}
                  onSelect={() => setBoard(parseInt(b))}
                  state={board === parseInt(b)}>
                  <Text>{b}</Text>
                </RadionButton>
              );
            })}
          </View>
          <View style={style.rowCare}>
            <Text>{t("contract")}:</Text>
          </View>
          <View
            style={[
              style.rowCare,
              { flexWrap: "wrap", justifyContent: "center" },
            ]}>
            <RadionButton
              onSelect={() => setContractNumber(1)}
              state={contractnumber === 1}>
              <Text>1</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractNumber(2)}
              state={contractnumber === 2}>
              <Text>2</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractNumber(3)}
              state={contractnumber === 3}>
              <Text>3</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractNumber(4)}
              state={contractnumber === 4}>
              <Text>4</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractNumber(5)}
              state={contractnumber === 5}>
              <Text>5</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractNumber(6)}
              state={contractnumber === 6}>
              <Text>6</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractNumber(7)}
              state={contractnumber === 7}>
              <Text>7</Text>
            </RadionButton>
          </View>
          <View style={style.rowCare}>
            <RadionButton
              onSelect={() => setContractSuit("NT")}
              state={contractSuit === "NT"}>
              <Text>NT</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractSuit("S")}
              state={contractSuit === "S"}>
              <Text>S</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractSuit("H")}
              state={contractSuit === "H"}>
              <Text>H</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractSuit("D")}
              state={contractSuit === "D"}>
              <Text>D</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractSuit("C")}
              state={contractSuit === "C"}>
              <Text>C</Text>
            </RadionButton>
          </View>
          <View style={[style.rowCare, { justifyContent: "center" }]}>
            <RadionButton
              onSelect={() => setContractDouble("")}
              state={contractDouble === ""}>
              <Text />
            </RadionButton>
            <RadionButton
              onSelect={() => setContractDouble("x")}
              state={contractDouble === "x"}>
              <Text>X</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setContractDouble("xx")}
              state={contractDouble === "xx"}>
              <Text>XX</Text>
            </RadionButton>
          </View>
          <View style={style.rowCare}>
            <RadionButton onSelect={() => setNsew("N")} state={nsew === "N"}>
              <Text>N</Text>
            </RadionButton>
            <RadionButton onSelect={() => setNsew("S")} state={nsew === "S"}>
              <Text>S</Text>
            </RadionButton>
            <RadionButton onSelect={() => setNsew("E")} state={nsew === "E"}>
              <Text>E</Text>
            </RadionButton>
            <RadionButton onSelect={() => setNsew("W")} state={nsew === "W"}>
              <Text>W</Text>
            </RadionButton>
          </View>
          <View style={style.rowCare}>
            <RadionButton
              onSelect={() => setResultOutcome("=")}
              state={resultOutcome === "="}>
              <Text>=</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setResultOutcome("+")}
              state={resultOutcome === "+"}>
              <Text>+</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setResultOutcome("-")}
              state={resultOutcome === "-"}>
              <Text>-</Text>
            </RadionButton>
            <TextInput
              style={[style.TextInput, { width: 100 }]}
              value={resultNumber.toString()}
              onChangeText={setResultNumberText}
              placeholder={"ponad/poniżej"}
              keyboardType={"number-pad"}
              // autoFocus={true}
              // returnKeyType="next"
              blurOnSubmit={false}
              autoCapitalize={"none"}
            />
          </View>
          <View style={style.rowCare}>
            <Text>{t("lead")}</Text>
          </View>
          <View style={style.rowCare}>
            <RadionButton
              onSelect={() => setLeadCardSuit("S")}
              state={leadCardSuit === "S"}>
              <Text>S</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardSuit("H")}
              state={leadCardSuit === "H"}>
              <Text>H</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardSuit("D")}
              state={leadCardSuit === "D"}>
              <Text>D</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardSuit("C")}
              state={leadCardSuit === "C"}>
              <Text>C</Text>
            </RadionButton>
          </View>
          <View style={style.rowCare}>
            <RadionButton
              onSelect={() => setLeadCardNumber("2")}
              state={leadCardNumber === "2"}>
              <Text>2</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("3")}
              state={leadCardNumber === "3"}>
              <Text>3</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("4")}
              state={leadCardNumber === "4"}>
              <Text>4</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("5")}
              state={leadCardNumber === "5"}>
              <Text>5</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("6")}
              state={leadCardNumber === "6"}>
              <Text>6</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("7")}
              state={leadCardNumber === "7"}>
              <Text>7</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("8")}
              state={leadCardNumber === "8"}>
              <Text>8</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("9")}
              state={leadCardNumber === "9"}>
              <Text>9</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("T")}
              state={leadCardNumber === "T"}>
              <Text>T</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("J")}
              state={leadCardNumber === "J"}>
              <Text>J</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("Q")}
              state={leadCardNumber === "Q"}>
              <Text>Q</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("K")}
              state={leadCardNumber === "K"}>
              <Text>K</Text>
            </RadionButton>
            <RadionButton
              onSelect={() => setLeadCardNumber("A")}
              state={leadCardNumber === "A"}>
              <Text>A</Text>
            </RadionButton>
          </View>
          {contractnumber !== 0 &&
            contractSuit !== "" &&
            leadCardSuit !== "" &&
            leadCardNumber !== "" &&
            nsew !== "" &&
            pairStat.BoardsNotPlayed.indexOf(board.toString()) !== -1 && (
              <View style={style.rowCare}>
                <Button
                  title={t("confirm")}
                  onPress={() => {
                    sumeupBoard();
                    sendNewReciveData({
                      board: board,
                      contract: contract,
                      declarer:
                        nsew === "N" || nsew === "S"
                          ? currentMOV.nsPair
                          : currentMOV.ewPair,
                      erased: false,
                      leadCard: leadCard,
                      ns: nsew,
                      pairEW: currentMOV.ewPair,
                      pairNS: currentMOV.nsPair,
                      remarks: "",
                      result: result,
                      round: currentMOV.round,
                      section: currentMOV.section,
                      table: currentMOV.table,
                    });
                    navigation.goBack();
                  }}
                  style={{ height: 64, width: 96 }}
                />
              </View>
            )}
          <View style={{ height: 300 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
};
