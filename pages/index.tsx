import React from "react";
import {Htag, Button, P} from "../components";


export default function Home(): JSX.Element {
    return (
        <>
          <Htag tag='h1' title={'Ку'}>Тексты</Htag>
          <Button appearance={"primary"} arrow={'down'}>кнопка 1</Button>
          <Button appearance={"ghost"} arrow={'right'}>кнопка 2</Button>
          <P size={"l"}>Большой</P>
          <P size={"m"}>Средний</P>
          <P size={"s"}>Маленький</P>
        </>
    );
}
