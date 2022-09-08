import json
import sys
import re

if __name__ == '__main__':
    if len(sys.argv) > 1: # we check if we received any argument
        if sys.argv[1] == "supports": 
            # then we are good to return an exit status code of 0, since the other argument will just be the renderer's name
            sys.exit(0)

    # load both the context and the book representations from stdin
    context, book = json.load(sys.stdin)
    # and now, we can just modify the content of the first chapter

    bookString = json.dumps(book)

    bookString = re.sub(r"\[diapo:(.*)\]", 'test', bookString)
    # we are done with the book's modification, we can just print it to stdout, 
    print(bookString)
	# r"\{\{diapo\:(.*)\}\}"
	# ## Le diaporama, support du cours\n\n\n<iframe src="https://eyssette.github.io/marp-slides//slides/2022-2023/\1.html"></iframe>
