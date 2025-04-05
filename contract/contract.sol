// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YoToken is ERC20 {
    constructor() ERC20("YoToken", "YTK") {
    }

    function mint(address to) external {
        require(balanceOf(to) == 0, "Already received a voting token");
        _mint(to, 1);
    }

    function burn(address from) external {
        require(balanceOf(from) > 0, "No tokens to burn");
        _burn(from, 1);
    }

    function _update(address from, address to, uint256 amount) internal override {
        require(from == address(0) || to == address(0), "Tokens are non-transferable");
        super._update(from, to, amount);
    }
}

contract Poll {
    struct Candidate {
        uint8 candidateId;
        string name;
        uint256 voteCount;
    }

    string public title;
    bool public isOpen;
    bool public wasOpen;
    address public pollOwner;
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    YoToken public yotoken;

    event CandidateAdded(uint8 indexed candidateId, string name);
    event Voted(address indexed voter, uint8 candidateId);
    event PollStatusChanged(bool isOpen);

    constructor(string memory _pollTitle, address _eligibilityToken, address _pollOwner) {
        title = _pollTitle;
        isOpen = false;
        wasOpen = false;
        yotoken = YoToken(_eligibilityToken);
        pollOwner = _pollOwner;
    }

    modifier onlyOpenPoll() {
        require(isOpen, "Poll is closed");
        _;
    }

    function pollIsOpen() public view returns(bool){
        return isOpen;
    }

    function pollHappened() public view returns(bool){
        return wasOpen;
    }

    function voterHasVoted(address voter) public view returns(bool){
        return hasVoted[voter];
    }

    function getPollOwner() public view returns(address){
        return pollOwner;
    }

    function addCandidate(string memory _candidateName) public{
        uint8 candidateId = uint8(candidates.length);
        candidates.push(Candidate(candidateId, _candidateName, 0));
        emit CandidateAdded(candidateId, _candidateName);
    }

    function togglePollStatus() public{
        isOpen = !isOpen;
        wasOpen = true;
        emit PollStatusChanged(isOpen);
    }

    function mintTokensToVoter(address voter) external{
        yotoken.mint(voter);
    }

    function vote(uint8 _candidateId) public onlyOpenPoll {
        require(_candidateId < candidates.length, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidates() public view returns (uint256){
        return candidates.length;
    }

    function getCandidateVotes(uint256 cindex) public view returns(uint256){
        return candidates[cindex].voteCount;
    }

    function getCandidate(uint8 index) public view returns (string memory, uint256) {
        require(index < candidates.length, "Invalid candidate index");
        Candidate storage candidate = candidates[index];
        return (candidate.name, candidate.voteCount);
    }
}

contract VotingSystem {
    Poll[] public polls;
    mapping(uint256=> YoToken) public eligibilityTokens;
    
    event PollCreated(address indexed pollAddress, string title, address pollETK);

    function createPoll(string memory _pollTitle) public {
        YoToken yotoken = new YoToken();
        eligibilityTokens[polls.length] = yotoken;
        Poll poll = new Poll(_pollTitle, address(eligibilityTokens[polls.length]), msg.sender);
        polls.push(poll);
        emit PollCreated(address(poll), _pollTitle, address(eligibilityTokens[polls.length]));
    }

    function mintVotingToken(uint256 pollIndex, address voter) public {
        require(msg.sender == polls[pollIndex].getPollOwner(), "Only poll creator can give out tokens");
        polls[pollIndex].mintTokensToVoter(voter);
    }

    function getPollCount() public view returns (uint256){
        return polls.length;
    }

    function addCandidate(uint256 pollIndex, string memory _CandidateName) public{
        require(!(polls[pollIndex].pollIsOpen()), "Cannot add candidates after poll starts");
        require(msg.sender == polls[pollIndex].getPollOwner(), "Not the poll creator");
        require(pollIndex < polls.length, "Invalid poll index");
        polls[pollIndex].addCandidate(_CandidateName);
    }

    function togglePollStatus(uint256 pollIndex) public {
        require(msg.sender == polls[pollIndex].getPollOwner(), "Not the poll creator");
        if (!polls[pollIndex].pollIsOpen()){
            require(!polls[pollIndex].pollHappened(), "Poll has already happened once");
        }
        polls[pollIndex].togglePollStatus();
    }

    function vote(uint8 pollIndex, uint8 candidateIndex) public {
        require(pollIndex < polls.length, "Invalid poll index");
        require(eligibilityTokens[pollIndex].balanceOf(msg.sender) > 0, "Not eligible to vote");
        require(!polls[pollIndex].voterHasVoted(msg.sender), "You have already voted");
        address voter = msg.sender;
        polls[pollIndex].vote(candidateIndex);
        eligibilityTokens[pollIndex].burn(voter);
    }

    function getCandidateCount(uint256 pollIndex) public view returns(uint256){
        require(pollIndex < polls.length, "Invalid index");
        uint256 candidateCount = polls[pollIndex].getCandidates();
        return candidateCount;
    }

    function getCandidate(uint256 pollIndex, uint8 candidateIndex) public view returns (string memory, uint256){
        return polls[pollIndex].getCandidate(candidateIndex);
    }

    function getPollWinner(uint256 pollIndex) public view returns (string memory, uint256){
        require(!(polls[pollIndex].pollIsOpen()), "Poll is still open");
        uint256 maxVotes = 0;
        uint8 winningIndex = 0;
        for (uint8 i = 0; i < polls[pollIndex].getCandidates(); i++) {
            uint256 votes = polls[pollIndex].getCandidateVotes(i);
            if (votes > maxVotes) {
                maxVotes = votes;
                winningIndex = i;
            }
        }
        return (polls[pollIndex].getCandidate(winningIndex));
    }
}