import os

def read_file_as_str(file_path):

    if not os.path.isfile(file_path):
        raise TypeError(file_path + " does not exist")
    content = open(file_path).read()
    return content

if __name__ == "__main__":
    # content = read_file_as_str("rank.json")
    # contentSplit = content.split("}{")
    # result = "{\"data\":["
    # for i in range(0, len(contentSplit)-1):
    #     result += contentSplit[i] + "},{"
    # result += contentSplit[len(contentSplit)-1]
    # result += "]}"

    # f = open("finalrank.json", "w")

    content0 = read_file_as_str("data10Month.json")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    content1 = read_file_as_str("finalrank.json")

    result = "{\"0\":" + content0 +", \"1\":" + content1 + "}"

    f = open("data11.json", "w")

    print(result, file = f)



