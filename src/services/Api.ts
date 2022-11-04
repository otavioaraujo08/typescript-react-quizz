import { Difficult } from "../Interfaces/Difficult"
import { Question } from "../Interfaces/Questions"
import { shuffleArray } from "../utils/ShuffleArray"

export const fetchQuizQuestions = async (amount: number, difficulty: Difficult) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`

    const data = await (await fetch(endpoint)).json()

    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }
    ))
}