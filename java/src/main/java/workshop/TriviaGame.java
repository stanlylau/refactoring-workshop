package workshop;

import java.util.ArrayList;
import java.util.LinkedList;

public class TriviaGame {
    ArrayList<String> players = new ArrayList<String>();
    int[] places = new int[6];
    int[] purses = new int[6];
    boolean[] inPenaltyBox = new boolean[6];

    LinkedList<String> popQuestions = new LinkedList<String>();
    LinkedList<String> scienceQuestions = new LinkedList<String>();
    LinkedList<String> sportsQuestions = new LinkedList<String>();
    LinkedList<String> rockQuestions = new LinkedList<String>();

    int currentPlayer = 0;
    boolean isGettingOutOfPenaltyBox;

    public TriviaGame() {
        for (int i = 0; i < 50; i++) {
            popQuestions.addLast("Pop Question " + i);
            scienceQuestions.addLast(("Science Question " + i));
            sportsQuestions.addLast(("Sports Question " + i));
            rockQuestions.addLast(createRockQuestion(i));
        }
    }

    public String createRockQuestion(int index) {
        return "Rock Question " + index;
    }

    public boolean isPlayable() {
        return (howManyPlayers() >= 2);
    }

    public boolean add(String playerName) {

        players.add(playerName);
        places[howManyPlayers()] = 0;
        purses[howManyPlayers()] = 0;
        inPenaltyBox[howManyPlayers()] = false;

        announce(playerName + " was added");
        announce("They are player number " + players.size());
        return true;
    }

    public int howManyPlayers() {
        return players.size();
    }

    public void roll(int roll) {
        announce(players.get(currentPlayer) + " is the current player");
        announce("They have rolled a " + roll);

        if (inPenaltyBox[currentPlayer]) {
            if (roll % 2 != 0) {
                isGettingOutOfPenaltyBox = true;

                announce(players.get(currentPlayer) + " is getting out of the penalty box");
                places[currentPlayer] = places[currentPlayer] + roll;
                if (places[currentPlayer] > 11)
                    places[currentPlayer] = places[currentPlayer] - 12;

                announce(players.get(currentPlayer)
                        + "'s new location is "
                        + places[currentPlayer]);
                announce("The category is " + currentCategory());
                askQuestion();
            } else {
                announce(players.get(currentPlayer) + " is not getting out of the penalty box");
                isGettingOutOfPenaltyBox = false;
            }

        } else {

            places[currentPlayer] = places[currentPlayer] + roll;
            if (places[currentPlayer] > 11)
                places[currentPlayer] = places[currentPlayer] - 12;

            announce(players.get(currentPlayer)
                    + "'s new location is "
                    + places[currentPlayer]);
            announce("The category is " + currentCategory());
            askQuestion();
        }

    }

    private void askQuestion() {
        if (currentCategory() == "Pop")
            announce(popQuestions.removeFirst());
        if (currentCategory() == "Science")
            announce(scienceQuestions.removeFirst());
        if (currentCategory() == "Sports")
            announce(sportsQuestions.removeFirst());
        if (currentCategory() == "Rock")
            announce(rockQuestions.removeFirst());
    }

    private String currentCategory() {
        if (places[currentPlayer] == 0)
            return "Pop";
        if (places[currentPlayer] == 4)
            return "Pop";
        if (places[currentPlayer] == 8)
            return "Pop";
        if (places[currentPlayer] == 1)
            return "Science";
        if (places[currentPlayer] == 5)
            return "Science";
        if (places[currentPlayer] == 9)
            return "Science";
        if (places[currentPlayer] == 2)
            return "Sports";
        if (places[currentPlayer] == 6)
            return "Sports";
        if (places[currentPlayer] == 10)
            return "Sports";
        return "Rock";
    }

    public boolean wasCorrectlyAnswered() {
        if (inPenaltyBox[currentPlayer]) {
            if (isGettingOutOfPenaltyBox) {
                announce("Answer was correct!!!!");
                purses[currentPlayer]++;
                announce(players.get(currentPlayer)
                        + " now has "
                        + purses[currentPlayer]
                        + " Gold Coins.");

                boolean winner = didPlayerWin();
                currentPlayer++;
                if (currentPlayer == players.size())
                    currentPlayer = 0;

                return winner;
            } else {
                currentPlayer++;
                if (currentPlayer == players.size())
                    currentPlayer = 0;
                return true;
            }

        } else {

            announce("Answer was correct!!!!");
            purses[currentPlayer]++;
            announce(players.get(currentPlayer)
                    + " now has "
                    + purses[currentPlayer]
                    + " Gold Coins.");

            boolean winner = didPlayerWin();
            currentPlayer++;
            if (currentPlayer == players.size())
                currentPlayer = 0;

            return winner;
        }
    }

    public boolean wrongAnswer() {
        announce("Question was incorrectly answered");
        announce(players.get(currentPlayer) + " was sent to the penalty box");
        inPenaltyBox[currentPlayer] = true;

        currentPlayer++;
        if (currentPlayer == players.size())
            currentPlayer = 0;
        return true;
    }

    private boolean didPlayerWin() {
        return !(purses[currentPlayer] == 6);
    }

    protected void announce(Object message) {
        System.out.println(message);
    }
}