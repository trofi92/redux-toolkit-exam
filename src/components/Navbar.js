import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  //가져오는 상태값을 명확하게 하기 위해서(가독성 측면) 구조분해할당 구문으로 표현
  const { amount } = useSelector((store) => store.cart);
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
