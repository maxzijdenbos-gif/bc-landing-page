# Code Review process

1. If there is multiple task to one story, then you create a story branch where
   all the tasks are merged into and then into develop: 1.1
   - feature/REVAMP-123-small-task -> feature/123-whole-feature
   - feature/1820-medium-task -> feature/123-whole-feature
   - Add task into branch validation rule

2. Who does the review of the pull request?
   - Everyone is tagged for review, write in our development chat if you have an
     open PR you want reviewed

3. Review each PR even though it is just a task going into a feature branch,
   because it is easier to read a little code than a lot.

4. Move task from code-review into ready for Test when the PR has been approved.

5. Set your reviewer status to "Awaiting Author" When waiting for the PR holder
   to answer your comments.

6. Only the PR holder merge the PR, this is to keep a clean git history.

7. The first person to pick up the story, assign themselves to the story and is
   responsible for moving all tasks into test, so test can see they can start.
   - This is relevant if you are more than one person on a story
