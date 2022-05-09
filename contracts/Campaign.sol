// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint256 _minimum) public {
        Campaign newCampaign = new Campaign(_minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedContracts() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 amount;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }
    uint256 reqId;
    mapping(uint256 => Request) public requests;

    uint public allrequests;
    address public manager;
    uint256 public minContri;
    address[] public approvers;
    mapping(address => uint256) public contributees;
    uint256 public approversCount;

    constructor(uint256 _minContri, address _manager) {
        manager = _manager;
        minContri = _minContri;
    }

    function contribute() public payable {
        require(msg.value >= minContri, "please send min amount");
        contributees[msg.sender] = msg.value;
        approvers.push(msg.sender);
        approversCount++;
    }

    function createRequest(
        string memory _desc,
        uint256 _amount,
        address _recipient
    ) public managerOnly {
        Request storage newRequest = requests[reqId++];
        newRequest.description = _desc;
        newRequest.amount = _amount;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
        allrequests++;
    }

    function approveRequest(uint256 _reqId) public {
        Request storage req = requests[_reqId];
        require(
            contributees[msg.sender] != 0,
            "you have not contributed to this campaign"
        );
        require(!req.approvals[msg.sender], "vote has already been recorded");

        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }

    function payout(uint256 _reqId) public payable {
        Request storage req = requests[_reqId];
        require(!req.complete, "the transaction is already completed");
        require(
            req.approvalCount >= (approversCount / 2),
            "don't have mininum approvals"
        );
        req.complete = true;
        payable(req.recipient).transfer(req.amount);
    }

    function campaignDetails()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minContri,
            address(this).balance,
            allrequests,
            approversCount,
            manager
        );
    }

    function getReqCount() public view returns (uint256) {
        return allrequests;
    }

    modifier managerOnly() {
        require(msg.sender == manager, "only manger can call this!");
        _;
    }
}
