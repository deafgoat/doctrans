import polib
import sys
import os.path

def fill_target(po_file, translated_file):
    translated_list = []

    with open(translated_file, 'r') as translated:
        for line in translated:
            if len(line) > 0:
                translated_list.append(line)

    po = polib.pofile(po_file)

    print "len(translated_list)", len(translated_list)
    for index, entry in enumerate(po):
        entry.msgstr = unicode(translated_list[index].strip(), "utf-8")
        print entry.msgstr

    print "po.translated_entries()", po.translated_entries()
    # Save translated po file into a new file.
    po.save(po_file + ".new")


def main():
    fill_target(sys.argv[1], sys.argv[2])

if __name__ == "__main__":
    main()

