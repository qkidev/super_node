// SPDX-License-Identifier: GPL-3.0
/**
 * 超级节点自动分红，把转入的qki，按多个节点的权重进行分配
 */
pragma solidity  ^0.7.6;
contract reward{
    
    mapping (address => uint) public  balanceOf;
    mapping (address => uint) public  Weights;
    address[] public  master_nodes;
    
    address payable public owner;
    
    
    event  Withdrawal(address indexed src, uint wad);
    
    constructor() {
        owner = msg.sender;
    }
    
    receive() payable external {
        deposit();
    }

    //转入的qki自动分红
    function deposit() public payable {
        uint total_weight = 0;
        //计算总权重=每个节点的qki*权重
        for(uint i;i<master_nodes.length;i++)
        {
            total_weight += address(master_nodes[i]).balance * Weights[master_nodes[i]];
        }
        uint qki = 0;
        for(uint i;i<master_nodes.length;i++)
        {
            //每个节点应该分配的qki=本次分红*（节点qki余额*权重/总权重）
            qki = msg.value *    address(master_nodes[i]).balance * Weights[master_nodes[i]] / total_weight;
            (bool success,  ) = address(master_nodes[i]).call{value:qki}(abi.encodeWithSignature("reward()", msg.sender));
        }
    }
    
    //添加节点
    function add_master_node(address new_node,uint weight) public {
        require(msg.sender == owner);
        //不能重复添加节点
        for(uint i;i<master_nodes.length;i++)
        {
            require(master_nodes[i] != new_node);
        }
        master_nodes.push(new_node);
        Weights[new_node] = weight;
    }
    
    //替换节点
    function update_node(uint index,address new_node,uint weight)public {
        require(msg.sender == owner);
        master_nodes[index] = new_node;
        Weights[new_node] = weight;
    }
    
    function node_amount() public view returns (uint amount){
        return master_nodes.length;
    }

    
    function setOwner(address payable new_owner) public {
        require(msg.sender == owner);
        owner = new_owner;
    }


    // 未分红的部分可以提出去
	function withdraw() public {
        require(msg.sender == owner);
		owner.transfer(address(this).balance);
	}
}