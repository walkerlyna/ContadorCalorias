
type CalorieDisplayProps = {
    calories: number
    text: string
    textColor?: string
}

export default function CalorieDisplay({ calories, text, textColor = 'text-orange-400' }: CalorieDisplayProps) {
    return (
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className={`font-black text-6xl ${textColor}`}>
                {calories}
            </span>
            {text}
        </p>
    )
}
