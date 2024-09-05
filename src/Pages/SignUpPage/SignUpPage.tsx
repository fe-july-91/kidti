import GenerativeBG from '../../Components/GenerativeBg/GenerativeBG'
import { SignUpForm } from '../../Components/SignUpForm/SignUpForm'
import './SignUpPage.scss'

export const SignUpPage: React.FC = () => {
  return (
    <div>
      <GenerativeBG />
      <div className="SignUpPage">
        <SignUpForm />
      </div>
    </div>
  )
}