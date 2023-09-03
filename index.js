const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";


program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    // console log the quote and author
    // You may style the text with chalk as you wish
      const fileContents = await fs.readFile(QUOTE_FILE,'utf-8',)
      const fileContentsArray = (fileContents.split('\n'))
      const randomQuote = fileContentsArray[(Math.floor(Math.random() * (fileContentsArray.length - 1)))]
      const quoteArray = randomQuote.split('|')
      const quote = quoteArray[0]
      const author = quoteArray[1]
      console.log(quote + " " + author)
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    try { 
      await fs.appendFile(QUOTE_FILE, quote) 
      await fs.appendFile(QUOTE_FILE, '|') 
      if (!author) {
        await fs.appendFile(QUOTE_FILE, 'Anonymous')
      }else{
        await fs.appendFile(QUOTE_FILE, author) 
       }
      await fs.appendFile(QUOTE_FILE, '\n')
      console.log('Quote Added')
      const fileInfo = await fs.readFile('./' + QUOTE_FILE,'utf-8', )
      console.log(fileInfo)
    }catch(err){
      console.log(err)
    }
  });

program.parse();
