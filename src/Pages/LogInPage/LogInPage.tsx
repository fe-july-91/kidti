import { useEffect, useState } from "react";
import { LogInForm } from "../../Components/LogInForm/LogInForm"
import './LogInPage.scss'
import { CSSTransition } from 'react-transition-group';

export const LogInPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true)
    }, [])
  
  return (
    <div>
      <div className="logInPage">
        <CSSTransition
          in={isVisible}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <LogInForm />
        </CSSTransition>

      </div>
    </div>
  )
}