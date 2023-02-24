from datetime import datetime, timedelta

def print_dates():
    now = datetime.now()
    for i in range(0, 3, 1):
        past_date = now - timedelta(days=i)
        print(past_date.strftime("%Y-%m-%d"))

print_dates()
