import axos from "axios";
import { Command } from "commander";

interface GithubEvent {
  type: string;
  repo: { name: string };
  createad_at: string;
}

const program = new Command();

program
  .name("github-cli-ts")
  .description("Fetch recent github activity for a user")
  .version("1.0.0");

  program.command('activity <username>').description('Fetch recent activity of a github user').action(async (username: string) => {
    
  })
