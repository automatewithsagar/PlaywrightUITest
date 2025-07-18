const ExcelJs = require('exceljs');
const {test,expect} = require("@playwright/test");

async function writeExcelTest(searchText, replaceText,change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText; //udating cell value
    await workbook.xlsx.writeFile(filePath); //saving file 
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 }; //creating object

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}


test('Upload download excel validation',async({page})=>{
    const textSearch = "Kivi";
    const updateValue = 350;
    await page.goto("http://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise =  page.waitForEvent('download');

    await page.getByRole("button",{name:"Download"}).click();
    await downloadPromise;

    writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"C:/Users/dahiyas/Downloads/download.xlsx");
    
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/dahiyas/Downloads/download.xlsx");
    
    const textLocator = page.getByText(textSearch);
    const desiredRow= await page.getByRole('row').filter({has:textLocator});
    await expect(desiredRow.locator("cell-4-undefined")).toContainText(updateValue);

})

