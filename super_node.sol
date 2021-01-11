// SPDX-License-Identifier: GPL-3.0

pragma solidity  ^0.7.5;

interface  token {
    function balanceOf(address owner) external view returns (uint);
}

interface node {
    function deposit(address owner) external payable returns (bool);
}

contract super_node {
    struct User {
        uint256 deposit;
        uint256 withdraw;
    }

    string public name     = "super node";
    string public symbol   = "sn";
    uint8  public decimals = 18;
    uint   public totalSupply=0;
    
    uint public withdrawPrice = 0;//解锁价格 
    address payable public next_pool;
    address public owner;
    
    address public pair = 0x482284801BC4f44eb0912FBb4f6Dff8815322145;

    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);
    event Received(address, uint);

    mapping (address => uint) public  balanceOf;
    
    constructor(uint price) {
        withdrawPrice = price;
        owner = msg.sender;
    }

    receive() payable external {
        deposit(msg.sender);
    }
    
    function set_next_pool(address payable pool) public
    {
        require(next_pool == address(0));
        require(owner == msg.sender);
        next_pool = pool;
    }

    //存入分红，直接转入会走deposit方法
    function reward() payable external{
        emit Received(msg.sender, msg.value);
    }

    function deposit(address user) public payable returns (bool){
        if(totalSupply == 0)
        {
            balanceOf[user] += msg.value;
            totalSupply = msg.value;
        }
        else
        {
            //数据按占比计算，因为qki已经转入，分母需要扣除本次的
            uint stake = totalSupply * msg.value / (address(this).balance - msg.value);
            balanceOf[user] += stake;
            totalSupply += stake;
        }
        emit Deposit(user, msg.value);
        return true;
    }

    function withdraw(uint stake) public {
        require(stake > 0);
        require(balanceOf[msg.sender] >= stake);

        require(getPrice() >= withdrawPrice,"Price");
        
        balanceOf[msg.sender] -= stake;
        uint qki = address(this).balance * stake / totalSupply;
        msg.sender.transfer(qki);
        totalSupply -= stake;
        Withdrawal(msg.sender, qki);
    }
    
    function upgrade(uint stake)public returns (bool ) {
        require(next_pool != address(0));
        require(stake > 0);
        require(balanceOf[msg.sender] >= stake);
 
        
        balanceOf[msg.sender] -= stake;
        uint qki = address(this).balance * stake / totalSupply;
        msg.sender.transfer(qki);
        totalSupply -= stake;
        (bool success,  ) = address(next_pool).call{value:qki}(abi.encodeWithSignature("deposit(address)", msg.sender));
        return success;
    }

    function getPrice() public view returns (uint)
    {
        //乘以1e18是为了避免小数
        return token(0xDF0e293CC3c7bA051763FF6b026DA0853D446E38).balanceOf(pair) * 1e18 / token(0x835F6dF988B6f51c9477D49e96aDBbc644ba97a2).balanceOf(pair);
    }

}