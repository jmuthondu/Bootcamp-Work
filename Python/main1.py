	#import library
import os
import csv

#joining path
budget_data = os.path.join("Resources", "budget_data.csv")

#Initializing the variables    
sum_months = 0
sum_revenue = 0
changes = []
tally_date = []
max_increase = 0
most_increased_month = 0
max_decrease = 0
most_decreased_month = 0

# open and read csv
with open('budgetdata.csv', newline="") as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=",")
    next(csv_reader, None)
    i = next(csv_reader)

    #Calculations of the Total months and total revenue

    last_profit = int(i[1])

    sum_months = sum_months + 1

    sum_revenue = sum_revenue + int(i[1])

    max_increase = int(i[1])

    most_increased_month = i[0]

    for i in csv_reader:

        sum_months = sum_months + 1
        sum_revenue = sum_revenue + int(i[1])

        # Comparing the monthly performance to prior months

        change = int(i[1]) - last_profit

        changes.append(change)

        last_profit = int(i[1])

        tally_date.append(i[0])

        # Calculations of the Greatest Increases 
        if int(i[1]) > max_increase:

            max_increase = int(i[1])
            most_increased_month = i[0]

        # Calculations of the Greatest Decreases
        if int(i[1]) < max_decrease:

            max_decrease = int(i[1])
            most_decreased_month = i[0]

    # Calculating the average and date
    average_change = sum(changes)/len(changes)

    highest_changes = max(changes)
    lowest_changes = min(changes)

    # Prints the values in terminal

    print("Financial Analysis")

    print("----------------------------")

    print("Total Months: " + str(sum_months))

    print("Total: $" + str(sum_revenue))

    print("Average Change: $" + str(average_change))

    print(f"Greatest Increase in Profits:, {most_increased_month}, (${highest_changes})")

    print(f"Greatest Decrease in Profits:, {most_decreased_month}, (${lowest_changes})")

    # Exports values to a text file
    file = open("fileOutput.txt","w+")

    file.write("Financial Analysis")

    file.write('\n' + "----------------------------")

    file.write('\n' + "Total Months: " + str(sum_months))

    file.write('\n' + "Total: $" + str(sum_revenue))

    file.write('\n' + "Average Change: $" + str(average_change))

    file.write('\n' + f"Greatest Increase in Profits: {most_increased_month}, (${highest_changes})")

    file.write('\n' + f"Greatest Decrease in Profits: {most_decreased_month}, (${lowest_changes})")
