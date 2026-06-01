def isValid(s: str) -> bool:
    bracket_dict = {"(": ")", "[": "]", "{": "}"}
    if len(s) % 2 != 0:
        return False

    for index, char in enumerate(s, 1):
        if not bracket_dict.get(char) and len(char) >= index:
            return False
        if bracket_dict.get(char) and s[index] != bracket_dict.get(char) and s[-index] != bracket_dict.get(char):
            return False
        else:
            continue
    return True


print(isValid("()"))
