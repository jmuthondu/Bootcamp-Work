	#import library
import os
import csv

#joining path
budget_data = os.path.join("Resources", "budget_data.csv")

# open and read csv
with open('budgetdata.csv', newline="") as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=",")
    csv_header = next(csvfile)

    # skiping the header row
    print(f"Header: {csv_header}")

    # finding net amount of profit and loss
    Profit_and_losses = []
    list_of_months = []

    #reading through each row of data after header
    for i in csv_reader:
        Profit_and_losses.append(int(i[1]))
        list_of_months.append(i[0])

    # Create an empty list of the revenue
    revenue = []

# Looping through the to get the revenue
    for i in range(1, len(Profit_and_losses)):
        revenue.append((int(Profit_and_losses[i]) - int(Profit_and_losses[i-1])))
    
    # Find the average revenue change
    average_revenue = sum(revenue) / len(revenue)
    
    # Find the total length of months
    total_length_of_months = len(list_of_months)

    # Find the greatest increase in revenue
    Max_revenue = max(revenue)

    # Find the greatest decrease in revenue
    Min_revenue = min(revenue)


    # print the Results
    print("Financial Analysis")

    print("...............................................................")

    print("Total months: " + str(total_length_of_months))

    print("Total: " + "$" + str(sum(Profit_and_losses)))

    print("Average change: " + "$" + str(average_revenue))

    print("Greatest Increase in Profits: " + str(list_of_months[revenue.index(max(revenue))+1]) + " " + "$" + str(Max_revenue))

    print("Greatest Decrease in Profits: " + str(list_of_months[revenue.index(min(revenue))+1]) + " " + "$" + str(Min_revenue))



    #  text file output

    file = open("output.txt","w")

    file.write("Financial Analysis" + "\n")

    file.write("............................................................." + "\n")

    file.write("Total months: " + str(total_length_of_months) + "\n")

    file.write("Total: " + "$" + str(sum(Profit_and_losses)) + "\n")

    file.write("Average change: " + "$" + str(average_revenue) + "\n")

    file.write("Greatest Increase in Profits: " + str(list_of_months[revenue.index(max(revenue))+1]) + " " + "$" + str(Max_revenue) + "\n")

    file.write("Greatest Decrease in Profits: " + str(list_of_months[revenue.index(min(revenue))+1]) + " " + "$" + str(Min_revenue) + "\n")

    file.close()

