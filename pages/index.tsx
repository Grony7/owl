import React, {useEffect, useState} from "react";
import {Htag, Button, P, Tag, Rating} from "../components";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from 'axios';
import {MenuItem} from "../interfaces/menu.interface";


function Home({menu} : HomeProps): JSX.Element {
  const [counter, setCounter] = useState<number>(0);
  const [rating, setRating] = useState<number>(2);
  useEffect( () => {
    console.log('Counter' + counter);
    return function () {
      console.log('Unmount');
    };
  }, []);
  return (
    <>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearance={"primary"} arrow={'down'} onClick={() =>setCounter(x => x + 1)}>кнопка 1</Button>
      <Button appearance={"ghost"} arrow={'right'}>кнопка 2</Button>
      <P size={"l"}>Большой</P>
      <P size={"m"}>Средний</P>
      <P size={"s"}>Маленький</P>
      <Tag href={"/order"}>Ссылка</Tag>
      <Tag color={'red'}>Кнопка</Tag>
      <Rating rating={rating} setRating={setRating} isEditable/>
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',{
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
