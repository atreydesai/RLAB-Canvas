"""Actions"""
MOVE_ACTIONS = ["go_A", "go_B", "go_C", "go_D", "go_red", "go_blue", "go_green", "go_yellow", "pick_up", "drop"]
"""BlockRoomMDP"""
Room = Enum("Room", "A B C D", start=0)
Box = Enum("Box", "BLUE GREEN RED YELLOW NONE", start=0)
@dataclasses.dataclass(frozen=True)
class BlockRoomMDPState(collections.abc.Sequence):
  """A BlockRoomMDP state."""
  room: Room
  at_box: Box
  holding_box: Box
  boxes: Dict[Box, Dict[Room, int]] example:   
  # Example value for boxes = {
  #                 Box.BLUE: {Room.A: 1, Room.B: 0, Room.C: 0, Room.D: 0},
  #                 Box.GREEN: {Room.A: 1, Room.B: 0, Room.C: 0, Room.D: 0},
  #                 Box.RED: {Room.A: 1, Room.B: 0, Room.C: 0, Room.D: 0},
  #                 Box.YELLOW: {Room.A: 1, Room.B: 0, Room.C: 0, Room.D: 0},
  #               } - this example has a blue, green, red, and yellow box in A and other rooms are empty.
class BlockRoomMDP(KnownTransitionMDPMixin, MDP):
  def _reward_func(self, state, action, next_state):
    """Reward func -- uncomment for each task you want to learn."""
    # # TASK 1: Go to yellow box.
    # if next_state.at_box == Box.YELLOW:
    #   return 1
    # # TASK 2: Pick up any box in current room.
    # if state.room != next_state.room:
    #   return -10
    # if next_state.holding_box != Box.NONE:
    #   return 1
    # # TASK 3: Go to box in room; if blue, bring it to room B. Otherwise, bring it to C.
    # if next_state.boxes[Box.BLUE.value][Room.B.value] == state.boxes[Box.BLUE.value][Room.B.value] + 1:
    #   return 1
    #
    # if (next_state.boxes[Box.RED.value][Room.C.value] == state.boxes[Box.RED.value][Room.C.value] + 1) or (
    #     next_state.boxes[Box.GREEN.value][Room.C.value] == state.boxes[Box.GREEN.value][Room.C.value] + 1) or (
    #     next_state.boxes[Box.YELLOW.value][Room.C.value] == state.boxes[Box.YELLOW.value][Room.C.value] + 1):
    #   return 1
    # # TASK 4: Remove all boxes from room A.
    # if sum(next_state.boxes[:, Room.A.value]) == 0:
    #   return 1
    return 0
  def get_transitions(
      self, state: BlockRoomMDPState,
      action: str) -> Sequence[Tuple[float, BlockRoomMDPState]]:
    """Transition function."""
    next_room = state.room
    next_at_box = state.at_box
    next_holding_box = state.holding_box
    next_boxes = copy.deepcopy(state.boxes)
    if action == "go_A":
      next_room = Room.A
      if state.holding_box == Box.NONE:
        next_at_box = Box.NONE
    elif action == "go_B":
      next_room = Room.B
      if state.holding_box == Box.NONE:
        next_at_box = Box.NONE
    elif action == "go_C":
      next_room = Room.C
      if state.holding_box == Box.NONE:
        next_at_box = Box.NONE
    elif action == "go_D":
      next_room = Room.D
      if state.holding_box == Box.NONE:
        next_at_box = Box.NONE
    elif action == "go_red":
      if state.boxes[Box.RED.value][state.room.value] > 0:
        next_at_box = Box.RED
    elif action == "go_green":
      if state.boxes[Box.GREEN.value][state.room.value] > 0:
        next_at_box = Box.GREEN
    elif action == "go_blue":
      if state.boxes[Box.BLUE.value][state.room.value] > 0:
        next_at_box = Box.BLUE
    elif action == "go_yellow":
      if state.boxes[Box.YELLOW.value][state.room.value] > 0:
        next_at_box = Box.YELLOW
    elif action == "pick_up":
      if (state.at_box != Box.NONE):
        next_holding_box = state.at_box
        if state.holding_box == Box.NONE:
          next_boxes[state.at_box.value][state.room.value] -= 1
    elif action == "drop":
      next_holding_box = Box.NONE
      if state.holding_box != Box.NONE:
        next_boxes[state.holding_box.value][state.room.value] += 1
    else:
      raise ValueError("invalid action")
    next_state_moved = BlockRoomMDPState(
      room=next_room,
      at_box=next_at_box,
      holding_box=next_holding_box,
      boxes=next_boxes,
    )
    return [(1, next_state_moved)] # [(probability, next_state)]
  def ground_to_visible(self, grounded_state: BlockRoomMDPState):
    """Basically a method to transform between the real "grounded" state and what the agent can observe"""
    return VisibleBlockRoomMDPState(
      room=grounded_state.room,
      at_box=grounded_state.at_box,
      blue_box_in_curr_room = grounded_state.boxes[Box.BLUE.value][grounded_state.room.value] > 0,
      green_box_in_curr_room=grounded_state.boxes[Box.GREEN.value][grounded_state.room.value] > 0,
      red_box_in_curr_room=grounded_state.boxes[Box.RED.value][grounded_state.room.value] > 0,
      yellow_box_in_curr_room=grounded_state.boxes[Box.YELLOW.value][grounded_state.room.value] > 0,
      is_holding_box=(grounded_state.holding_box != Box.NONE),
    )
@dataclasses.dataclass(frozen=True)
class VisibleBlockRoomMDPState(collections.abc.Sequence):
  """Visible part of a BlockRoomMDP state."""
  room: Room
  at_box: Box
  blue_box_in_curr_room: bool
  green_box_in_curr_room: bool
  red_box_in_curr_room: bool
  yellow_box_in_curr_room: bool
  is_holding_box: bool