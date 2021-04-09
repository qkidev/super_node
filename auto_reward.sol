// SPDX-License-Identifier: GPL-3.0
pragma solidity  ^0.7.6;

contract auto_reward{
    address payable public owner;
    address payable public reward = 0x331791FC29C9a2659a9834aC21B799ceF37234Fb;

    uint Intervals = 3600;//间隔时间，均匀分红

    uint last_time = 0;//上次分红时间

    uint max_reward = 10e18;//单次最高分红，均匀分红

    uint reward_times = 100;//每次分红1/n

    constructor() {
        owner = msg.sender;
    }
    
    receive() payable external {
        
    }


    //分红，任意用户都可以调用
    function reward() public {
        require(block.timestamp - last_time >= Intervals);
         uint send_reward = address(this).balance/reward_times;
        if(send_reward > max_reward)
            send_reward = max_reward;
        reward.transfer(send_reward);
        last_time = block.timestamp;
    }

    function setIntervals(uint new_Intervals) public {
        require(msg.sender == owner);
        require(new_Intervals >= 600);
        Intervals = new_Intervals;
    }

    function setreward_times(uint new_reward_times) public {
        require(msg.sender == owner);
        require(new_reward_times >= 100);
        reward_times = new_reward_times;
    }

    function setmax_reward(uint new_max_reward) public {
        require(msg.sender == owner);
        require(new_max_reward >= 10e18);
        max_reward = new_max_reward;
    }
     function set_new_reward(address payable new_reward) public {
        require(msg.sender == owner);
        reward =new_reward;
    }

}
