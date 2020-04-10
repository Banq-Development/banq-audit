pragma solidity 0.5.16;

contract ConvertBytes{
    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
      
        bytes memory input = bytes(source);
        
        result = keccak256(input);
    }
}
