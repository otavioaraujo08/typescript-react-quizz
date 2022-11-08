import { AnswersObject } from "../../Interfaces/Answers";
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswersObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
    return (
        <Wrapper>
            <p className="number">Questão: {questionNumber} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html: question}}/>

            <div>
                {answers.map(answer => (
                    <ButtonWrapper 
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button disabled={userAnswer ? true : false} value={answer}  onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}}/>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}