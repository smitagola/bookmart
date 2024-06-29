import { Chart } from "react-google-charts";

const UsersChart = () => {
    const data = [
        ["Year", "Total Users", { role : "style"}],
        ["2020", 10000, "#EF6C00"],
        ["2021", 13675, "#EF6C00"],
        ["2022", 16000, "EF6C00"],
        ["2023", 20000, "#EF6C00"]
    ]

    return(
        <>
            <Chart chartType="ColumnChart" width="120%" height={"400px"} data={data} />
        </>
    )
}

export default UsersChart;