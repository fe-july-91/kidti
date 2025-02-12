import { SignUpForm } from '../../Components/SignUpForm/SignUpForm'
import './SignUpPage.scss'
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from "react";

export const SignUpPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true)
    }, [])
  return (
    <div>
      <div className="SignUpPage">
        <CSSTransition
            in={isVisible}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <SignUpForm />
        </CSSTransition>

      </div>
    </div>
  )
}