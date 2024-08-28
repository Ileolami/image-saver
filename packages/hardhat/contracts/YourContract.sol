//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract YourContract {
          struct Event {
        address owner;
        string name;
        Image[] images;
    }

    struct Image {
        address uploader;
        string url;
    }

    mapping(uint256 => Event) public events;
    mapping(string => uint256) public eventNames;
    uint256 public eventCount;

    event EventCreated(uint256 eventId, address owner, string name);
    event ImageUploaded(uint256 eventId, address uploader, string url);

    function createEvent(string memory _name) public {
        eventCount++;
        Event storage newEvent = events[eventCount];
        newEvent.owner = msg.sender;
        newEvent.name = _name;
        eventNames[_name] = eventCount;
        emit EventCreated(eventCount, msg.sender, _name);
    }

    function uploadImage(string memory _eventName, string memory _url) public {
        uint256 eventId = eventNames[_eventName];
        require(eventId > 0 && eventId <= eventCount, "Event does not exist");
        Event storage eventInstance = events[eventId];
        eventInstance.images.push(Image(msg.sender, _url));
        emit ImageUploaded(eventId, msg.sender, _url);
    }

    function getEventImages(string memory _eventName) public view returns (Image[] memory) {
        uint256 eventId = eventNames[_eventName];
        require(eventId > 0 && eventId <= eventCount, "Event does not exist");
        return events[eventId].images;
    }

    function getEvents() public view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](eventCount);
        for (uint256 i = 1; i <= eventCount; i++) {
            allEvents[i - 1] = events[i];
        }
        return allEvents;
    }

       function getImagesCountForAllEvents() public view returns (uint256[] memory) {
        uint256[] memory imagesCount = new uint256[](eventCount);
        for (uint256 i = 1; i <= eventCount; i++) {
            imagesCount[i - 1] = events[i].images.length;
        }
        return imagesCount;
    }
}
