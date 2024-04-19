function strToTab(inputStr) {
    let rows = inputStr.trim().split("\n");
    let table = rows.map(row => row.split("\t"));
    return table;
}

function createRow(row) {
    let outputRow = [];

    for (let index = 0; index < row.length; index++) {
        outputRow.push(row[index]);

        if (index === row.length - 1) {
            outputRow.push(" \\\\");
        } else {
            outputRow.push(" & ");
        }
    }

    return outputRow.join("");
}

function convertToLatex() {
    let input = document.getElementById("input").value;
    let outputDiv = document.getElementById("output");

    let latexTable = ["\\begin{table}", "\\centering"];

    let tabData = strToTab(input);

    let numCols = tabData[0].length;
    let colTerm = Array(numCols).fill("|c").join("") + "|";
    let beginTabular = "\\begin{tabular}" + `{|${colTerm}|}`;

    latexTable.push(beginTabular);
    latexTable.push("\\hline", "\\rowcolor{gray!30}");

    for (let i = 0; i < tabData.length; i++) {
        let latexRow = createRow(tabData[i]);
        latexTable.push(latexRow);
        latexTable.push("\\hline");
    }

    latexTable.push("\\end{tabular}", "\\caption{Caption}", "\\label{tab:label}", "\\end{table}");

    outputDiv.textContent = latexTable.join("\n");
}
