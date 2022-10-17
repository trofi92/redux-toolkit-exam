import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateTotals,
  getCartItems,
} from "./features/cart/cartSlice";

function App() {
  // 장바구니는 Navbar에 포함되어 있음 =>Navbar는 모든 페이지에 삽입
  // 즉, amount, price를 전역적으로 사용하는 것과 같음
  // 따라서 App에서 useEffect hook을 사용하여, cartItems의 값이 변경될때마다
  // price, amount를 update해주는 로직을 구현
  const { cartItems, isLoading } = useSelector((state) => state.cart); // reducer:  cart의 상태선택, cartItems의 변화를 전달
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch(); //action함수 dispatch

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]); // 의존성으로 cartItems를 선언

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
