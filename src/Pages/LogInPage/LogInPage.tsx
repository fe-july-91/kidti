import { LogInForm } from "../../Components/LogInForm/LogInForm"
import './LogInPage.scss'

export const LogInPage: React.FC = () => {
  return (
    <div>
      <div className="logInPage">
        <LogInForm />
      </div>
    </div>
  )
}