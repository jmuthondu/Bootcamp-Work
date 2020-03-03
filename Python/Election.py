 
 #import os and csv files
import os
import csv

# Define the variables
sum_of_votes = 0
khan = 0
correy = 0
li = 0
otooley = 0

# joining the path
data = os.path.join("Resources", "election_data.csv")

# open and read csv
with open('election_data.csv', newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    csv_header = next(csvfile)

    for i in csvreader:
        sum_of_votes += 1

        # number of votes for each candidate

        if (i[2] == "Khan"):
            khan += 1
        elif (i[2] == "Correy"):
            correy += 1
        elif (i[2] == "Li"):
            li += 1
        else:
            otooley += 1

    # percentage of votes received 
    khan_percentage = khan / sum_of_votes
    correy_percentage = correy / sum_of_votes
    li_percentage = li / sum_of_votes
    otooley_percentage = otooley / sum_of_votes

    #  winner of the election
    election_winner = max(khan, correy, li, otooley)

    if election_winner == khan:
        winner = "Khan"
    elif election_winner == correy:
        winner == "Correy"
    elif election_winner == li:
        winner = "Li"
    else:
        winner = "O'Tooley"

# Print the results of the election
print("Election Results")

print("-------------------------")

print("Total Votes: " + str(sum_of_votes))

print("-------------------------")

print(f"Kahn: {khan_percentage:.3%}({khan})")

print(f"Correy: {correy_percentage:.3%}({correy})")

print(f"Li: {li_percentage:.3%}({li})")

print(f"O'Tooley: {otooley_percentage:.3%}({otooley})")

print("-------------------------")

print(f"Winner: {winner}")

print("-------------------------")

# Exports values to a text file
file_writer = open("file_writerOutput.txt","w+")

file_writer.write("Election Results")

file_writer.write('\n' + f"-------------------------")

file_writer.write('\n' + f"Total Votes: {sum_of_votes}")

file_writer.write('\n' + f"-------------------------")

file_writer.write('\n' + f"Kahn: {khan_percentage:.3%}({khan})")

file_writer.write('\n' + f"Correy: {correy_percentage:.3%}({correy})")

file_writer.write('\n' + f"Li: {li_percentage:.3%}({li})")

file_writer.write('\n' + f"O'Tooley: {otooley_percentage:.3%}({otooley})")

file_writer.write('\n' + f"-------------------------")

file_writer.write('\n' + f"Winner: {winner}")

file_writer.write('\n' + f"-------------------------")
