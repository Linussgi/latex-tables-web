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
    const inputTextArea = document.getElementById("input");
    const outputDiv = document.getElementById("output");

    const inputData = inputTextArea.value.trim();

    const rows = inputData.split("\n");
    const table = rows.map(row => row.split("\t"));

    let latexTable = "\\begin{table}\n\\centering\n\\begin{tabular}{";

    const numCols = table[0].length;

    for (let i = 0; i < numCols; i++) {
        latexTable += "|c";
    }
    latexTable += "|}\n\\hline\n";

    latexTable += ("\\rowcolor{gray!30}\n");

    table.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            latexTable += cell;
            if (cellIndex !== row.length - 1) {
                latexTable += " & ";
            } else {
                latexTable += " \\\\";
            }
        });

        if (rowIndex !== table.length - 1) {
            latexTable += "\n\\hline\n";
        } else {
            latexTable += "\n\\hline";
        }
    });


    latexTable += "\n\\end{tabular}\n\\caption{Caption}\n\\label{tab:label}\n\\end{table}";

    copyButton.textContent = "Copy to Clipboard";
    outputDiv.textContent = latexTable;
}

function copyToClipboard() {
    const outputDiv = document.getElementById("output");

    const latexTable = outputDiv.textContent.trim();

    navigator.clipboard.writeText(latexTable)
        .then(() => {
            copyButton.textContent = "Copied!";
        })
        .catch((error) => {
            console.error("Error copying text:", error);
            copyButton.textContent = "Error Copying Text";
        });

}

const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", convertToLatex);

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copyToClipboard);
