#!/usr/bin/env node

import axios from "axios";
import { Command } from "commander";

interface GithubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
}

const program = new Command();

program
  .name("github-cli-ts")
  .description("Fetch recent github activity for a user")
  .version("1.0.0");

  program.command('activity <username>').description('Fetch recent activity of a github user').action(async (username: string) => {

    const url = `https://api.github.com/users/${username}/events/public`;

    try {
        console.log(`Fetching recent activity for user: ${username}...\n`);

        const response = await axios.get<GithubEvent[]>(url);

        if(response.data.length === 0) {
            console.log('No recent acivity found.');
        }

        response.data.slice(0, 5).forEach((event, index) => {
            const type = event.type.replace('Event', ' ');
            const repoName = event.repo.name;
            const date = new Date(event.created_at).toLocaleDateString();

            console.log(`${index + 1}. ${type} in repository: ${repoName} (${date})`);;
        });

        // Handle errors
    } catch (error: any) {
        if(error.response?.status === 404) {
            console.log('User not found. Please check the username and try again');
        } else {
            console.log('An error occured while fetching data. Pls try again.');
        }
    }
  })

  // Parse command line arguments 
  program.parse(process.argv)