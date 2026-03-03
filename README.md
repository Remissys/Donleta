# Donleta - Discord Bot for Competitive Genshin Impact

**Donleta** is a Discord bot integrated with the Google Sheets API, designed to manage and track the results of a casual *Genshin Impact* competition. In each round, two characters are randomly selected to fight against a randomly chosen boss. The time taken to defeat the boss, along with the characters' scores, determines the final result of the competition.

The competition is hosted by streamer [**don_nobru**](https://www.twitch.tv/don_nobru) on Twitch. If you want to watch the rounds live or participate in the competition, check out his streams! The **competitive Donleta** takes place from Wednesday to Friday starting at 22:00 UTC-3, and there is a **casual competition** in pairs every Saturday, also at 22:00 UTC-3.

## Features

- **Google Sheets Integration**: Competition results are stored and managed through Google Sheets.
- **Interactive Commands**: Users can view their performance, check monthly, daily, and weekly rankings, and link their Discord account to their competition profile for convenience.

## Commands

Here’s the list of available commands to interact with the bot:

### 1. `/comandos`
**Description**: Displays all available commands for Donleta Bot!

This command helps users discover all the features Donleta offers.

### 2. `/dia`
**Description**: Displays the daily results of Donleta, or the results of a specific day if the user provides a date.

Use this command to check the results for any given day, or see the most recent daily results.

### 3. `/link`
**Description**: Links your Discord account with your Donleta profile!

This command allows you to link your Discord account to your Donleta profile, so you won’t have to specify your username every time you use other commands like `/profile`.

### 4. `/perfil`
**Description**: Displays your last 3 results in the Donleta competition.

Once your account is linked with `/link`, you won’t need to specify your username to see your latest results. This will show your performance in the competition, including details like the characters used, the bosses you fought and the time taken for each run.

### 5. `/ping`
**Description**: Check if the bot is still alive and functioning!

A simple command to verify that Donleta is up and running. Great for when you’re unsure if the bot is online.

### 6. `/rank`
**Description**: Displays the monthly results of Donleta, or results for a specific month if provided by the user.

This shows the leaderboard for the current month, or for a specified month. The monthly ranking is based on the sum of your **two highest scores** within the month.

### 7. `/semana`
**Description**: Displays the weekly results of Donleta, or results for a specific week if provided by the user.

View your weekly performance or check the leaderboard for any given week.

## How does the competition work?

The competition is based on randomly drawn characters and bosses. Each character and boss has an assigned score, and the time it takes to defeat the boss adds additional points to the result. After each round, the bot logs the results, allowing users to check their scores through the commands listed above.

### **Monthly Scoring System**:
For the monthly ranking, the user’s total score is determined by the **sum of their two highest scores** within the month. This means that even if you have multiple rounds in a month, only your top two performances will contribute to your monthly ranking.

