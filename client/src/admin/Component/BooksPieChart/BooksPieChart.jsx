import { Chart } from 'react-google-charts';

const BooksPieChart = () => {
    const PieChartData = [
        ["Book-Category", "Preference"],
        ["Biography", 20],
        ["Self-Improvement", 10],
        ["Poems", 5],
        ["Coding", 15],
        ["History", 8],
        ["Novels", 15]
    ]

    const options = {
        title : "Book Category Preference"
    }
    return(
        <>
            <Chart 
                chartType="PieChart"
                data={PieChartData}
                options={options}
                width={"104%"}
                height={"400px"}
            />
        </>
    )
}

export default BooksPieChart;